export class Aviso {
  key: string;
  fechaCreacion: string;
  tarea: string[];
  fechaVencimiento: string;
  horaVencimiento: string;
  mensajeEnviado:boolean;
  nombreContacto: string;
  telefonoContacto: string;
  estadoDeLaTarea: string; //Pendiente, Vencida
  reagendar:boolean;
  plazoReagenda:    string; //Mensual, semanal, trimestral, semestral, anual


}

