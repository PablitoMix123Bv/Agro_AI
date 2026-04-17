export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'farmer';
}

export interface Plot {
  id: string;
  farmerId: string;
  name: string;
  cropType: string;
  sizeHectares: number;
}

export interface SensorData {
  id: string;
  plotId: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  timestamp: Date;
}
