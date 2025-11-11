export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alunos: {
        Row: {
          created_at: string
          data_nascimento: string | null
          email: string
          id: string
          nome: string
          telefone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_nascimento?: string | null
          email: string
          id?: string
          nome: string
          telefone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_nascimento?: string | null
          email?: string
          id?: string
          nome?: string
          telefone?: string
          updated_at?: string
        }
        Relationships: []
      }
      interacoes: {
        Row: {
          created_at: string
          data: string
          id: string
          observacoes: string | null
          responsavel: string
          resposta: string | null
          status: Database["public"]["Enums"]["status_interacao"]
          tipo: Database["public"]["Enums"]["tipo_interacao"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: string
          id?: string
          observacoes?: string | null
          responsavel: string
          resposta?: string | null
          status?: Database["public"]["Enums"]["status_interacao"]
          tipo: Database["public"]["Enums"]["tipo_interacao"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: string
          id?: string
          observacoes?: string | null
          responsavel?: string
          resposta?: string | null
          status?: Database["public"]["Enums"]["status_interacao"]
          tipo?: Database["public"]["Enums"]["tipo_interacao"]
          updated_at?: string
        }
        Relationships: []
      }
      matriculas: {
        Row: {
          aluno_id: string
          created_at: string
          data_inicio: string
          data_vencimento: string
          id: string
          plano_id: string
          status: Database["public"]["Enums"]["status_matricula"]
          updated_at: string
        }
        Insert: {
          aluno_id: string
          created_at?: string
          data_inicio?: string
          data_vencimento: string
          id?: string
          plano_id: string
          status?: Database["public"]["Enums"]["status_matricula"]
          updated_at?: string
        }
        Update: {
          aluno_id?: string
          created_at?: string
          data_inicio?: string
          data_vencimento?: string
          id?: string
          plano_id?: string
          status?: Database["public"]["Enums"]["status_matricula"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          created_at: string
          descricao: string | null
          economia: string | null
          id: string
          nome: string
          preco: number
          tipo: Database["public"]["Enums"]["tipo_plano"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          economia?: string | null
          id?: string
          nome: string
          preco: number
          tipo: Database["public"]["Enums"]["tipo_plano"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          economia?: string | null
          id?: string
          nome?: string
          preco?: number
          tipo?: Database["public"]["Enums"]["tipo_plano"]
          updated_at?: string
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          created_at: string
          descricao: string
          id: string
          prazo: string
          prioridade: Database["public"]["Enums"]["prioridade_tarefa"]
          responsavel: string | null
          status: Database["public"]["Enums"]["status_tarefa"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: string
          prazo: string
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: string
          prazo?: string
          prioridade?: Database["public"]["Enums"]["prioridade_tarefa"]
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_responsavel_fkey"
            columns: ["responsavel"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          cargo: string | null
          created_at: string
          email: string
          id: string
          nivel: string | null
          nome: string
          status: string
          telefone: string
          tipo: Database["public"]["Enums"]["tipo_usuario"]
          updated_at: string
        }
        Insert: {
          cargo?: string | null
          created_at?: string
          email: string
          id?: string
          nivel?: string | null
          nome: string
          status?: string
          telefone: string
          tipo?: Database["public"]["Enums"]["tipo_usuario"]
          updated_at?: string
        }
        Update: {
          cargo?: string | null
          created_at?: string
          email?: string
          id?: string
          nivel?: string | null
          nome?: string
          status?: string
          telefone?: string
          tipo?: Database["public"]["Enums"]["tipo_usuario"]
          updated_at?: string
        }
        Relationships: []
      }
      vendas: {
        Row: {
          cliente: string
          created_at: string
          id: string
          produto: string
          responsavel: string | null
          status: Database["public"]["Enums"]["status_venda"]
          updated_at: string
          valor: number
        }
        Insert: {
          cliente: string
          created_at?: string
          id?: string
          produto: string
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_venda"]
          updated_at?: string
          valor: number
        }
        Update: {
          cliente?: string
          created_at?: string
          id?: string
          produto?: string
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_venda"]
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "vendas_responsavel_fkey"
            columns: ["responsavel"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      prioridade_tarefa: "alta" | "media" | "baixa"
      status_interacao: "pendente" | "respondido"
      status_matricula: "ativa" | "atrasada" | "cancelada"
      status_tarefa: "pendente" | "em_andamento" | "concluida"
      status_venda: "em_negociacao" | "fechado" | "perdido"
      tipo_interacao: "ligacao" | "email" | "reuniao" | "visita" | "suporte"
      tipo_plano: "musculacao" | "zumba" | "pilates" | "combo"
      tipo_usuario: "vendedor" | "gestor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      prioridade_tarefa: ["alta", "media", "baixa"],
      status_interacao: ["pendente", "respondido"],
      status_matricula: ["ativa", "atrasada", "cancelada"],
      status_tarefa: ["pendente", "em_andamento", "concluida"],
      status_venda: ["em_negociacao", "fechado", "perdido"],
      tipo_interacao: ["ligacao", "email", "reuniao", "visita", "suporte"],
      tipo_plano: ["musculacao", "zumba", "pilates", "combo"],
      tipo_usuario: ["vendedor", "gestor", "admin"],
    },
  },
} as const
