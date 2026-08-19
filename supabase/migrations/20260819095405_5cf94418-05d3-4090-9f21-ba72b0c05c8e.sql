CREATE POLICY "Public Access Content"
ON storage.objects FOR SELECT
USING ( bucket_id = 'content' );

CREATE POLICY "Authenticated Upload Content"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'content' );
