export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          handled: boolean;
          id: number;
          message: string;
          name: string;
          phone: string | null;
          subject: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          handled?: boolean;
          id?: never;
          message: string;
          name: string;
          phone?: string | null;
          subject?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          handled?: boolean;
          id?: never;
          message?: string;
          name?: string;
          phone?: string | null;
          subject?: string;
        };
        Relationships: [];
      };
      event_registrations: {
        Row: {
          created_at: string;
          email: string;
          event_id: number;
          id: number;
          name: string;
          phone: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          event_id: number;
          id?: never;
          name: string;
          phone?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          event_id?: number;
          id?: never;
          name?: string;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          created_at: string;
          description: string;
          event_date: string;
          event_time: string;
          id: number;
          registration_link: string | null;
          seats: number | null;
          title: string;
          updated_at: string;
          venue: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          event_date: string;
          event_time?: string;
          id?: never;
          registration_link?: string | null;
          seats?: number | null;
          title: string;
          updated_at?: string;
          venue?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          event_date?: string;
          event_time?: string;
          id?: never;
          registration_link?: string | null;
          seats?: number | null;
          title?: string;
          updated_at?: string;
          venue?: string;
        };
        Relationships: [];
      };
      members: {
        Row: {
          company: string | null;
          created_at: string;
          designation: string | null;
          email: string;
          featured: boolean;
          full_name: string;
          id: number;
          message: string | null;
          phone: string | null;
          status: string;
          tier: string;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          designation?: string | null;
          email: string;
          featured?: boolean;
          full_name: string;
          id?: never;
          message?: string | null;
          phone?: string | null;
          status?: string;
          tier?: string;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          designation?: string | null;
          email?: string;
          featured?: boolean;
          full_name?: string;
          id?: never;
          message?: string | null;
          phone?: string | null;
          status?: string;
          tier?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: never;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: never;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          author_name: string | null;
          author_title: string | null;
          category: string;
          content: string;
          cover_image_url: string | null;
          created_at: string;
          excerpt: string | null;
          id: number;
          published: boolean;
          read_time: string | null;
          slug: string;
          tags: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_name?: string | null;
          author_title?: string | null;
          category?: string;
          content?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: never;
          published?: boolean;
          read_time?: string | null;
          slug: string;
          tags?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_name?: string | null;
          author_title?: string | null;
          category?: string;
          content?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: never;
          published?: boolean;
          read_time?: string | null;
          slug?: string;
          tags?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          approved: boolean;
          company: string | null;
          created_at: string;
          designation: string | null;
          id: number;
          message: string;
          name: string;
          rating: number;
        };
        Insert: {
          approved?: boolean;
          company?: string | null;
          created_at?: string;
          designation?: string | null;
          id?: never;
          message: string;
          name: string;
          rating?: number;
        };
        Update: {
          approved?: boolean;
          company?: string | null;
          created_at?: string;
          designation?: string | null;
          id?: never;
          message?: string;
          name?: string;
          rating?: number;
        };
        Relationships: [];
      };
      site_stats: {
        Row: {
          display_order: number;
          icon: string | null;
          id: number;
          key: string;
          label: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          display_order?: number;
          icon?: string | null;
          id?: never;
          key: string;
          label: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          display_order?: number;
          icon?: string | null;
          id?: never;
          key?: string;
          label?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          created_at: string;
          designation: string;
          display_order: number;
          id: number;
          linkedin_url: string | null;
          name: string;
          photo_url: string | null;
        };
        Insert: {
          created_at?: string;
          designation?: string;
          display_order?: number;
          id?: never;
          linkedin_url?: string | null;
          name: string;
          photo_url?: string | null;
        };
        Update: {
          created_at?: string;
          designation?: string;
          display_order?: number;
          id?: never;
          linkedin_url?: string | null;
          name?: string;
          photo_url?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const;
