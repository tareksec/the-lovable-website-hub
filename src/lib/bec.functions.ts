import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  designation: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(2000),
});

const registrationSchema = z.object({
  eventId: z.number().int().positive(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(3000),
});

const memberSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  designation: z.string().trim().max(160).optional(),
  tier: z.enum(["basic", "professional", "corporate"]),
  message: z.string().trim().max(2000).optional(),
});

const emailSchema = z.object({ email: z.string().trim().email().max(200) });

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => reviewSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").insert({
      name: data.name,
      designation: data.designation || null,
      company: data.company || null,
      rating: data.rating,
      message: data.message,
      approved: false,
    });
    if (error) throw new Error("Could not submit review");
    return { ok: true as const };
  });

export const registerForEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => registrationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("event_registrations").insert({
      event_id: data.eventId,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
    });
    if (error) throw new Error("Could not register for this event");
    return { ok: true as const };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || "",
      message: data.message,
    });
    if (error) throw new Error("Could not send message");
    return { ok: true as const };
  });

export const joinMember = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => memberSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("members").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      designation: data.designation || null,
      tier: data.tier,
      message: data.message || null,
    });
    if (error) throw new Error("Could not submit application");
    return { ok: true as const };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => emailSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert({ email: data.email.toLowerCase() }, { onConflict: "email" });
    if (error) throw new Error("Could not subscribe");
    return { ok: true as const };
  });

export const listFeaturedMembers = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("members")
    .select("id, full_name, designation, company, tier")
    .eq("featured", true)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(12);
  if (error) return [];
  return (data ?? []).map((m) => ({
    id: m.id,
    fullName: m.full_name,
    designation: m.designation,
    company: m.company,
    tier: (m.tier as "basic" | "professional" | "corporate") ?? "basic",
  }));
});
