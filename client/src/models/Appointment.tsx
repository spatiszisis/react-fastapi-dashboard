interface AppointmentBase {
  title: string;
  description: string;
  is_active: boolean;
  date: string;
  user_id: number;
}

export interface AppointmentCreate extends AppointmentBase {}

export interface AppointmentUpdate extends AppointmentBase {}

export interface Appointment extends AppointmentBase {
  id: number;
  created_at: string;
  updated_at: string;
}
