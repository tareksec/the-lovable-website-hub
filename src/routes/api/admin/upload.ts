import { createFileRoute } from '@tanstack/react-router';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export const Route = createFileRoute('/api/admin/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get('file') as File;

          if (!file) {
            return new Response(JSON.stringify({ error: 'No file uploaded' }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const filePath = `blog/${fileName}`;

          // Upload to Supabase Storage 'content' bucket
          const { data, error } = await supabaseAdmin.storage
            .from('content')
            .upload(filePath, file, {
              upsert: true,
              contentType: file.type,
            });

          if (error) {
            console.error('Storage upload error:', error);
            return new Response(JSON.stringify({ error: error.message }), { 
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          // Get public URL
          const { data: urlData } = supabaseAdmin.storage
            .from('content')
            .getPublicUrl(filePath);

          return new Response(JSON.stringify({ url: urlData.publicUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          console.error('Server error during upload:', err);
          return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  }
});
