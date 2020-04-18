import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default api;

/**
 *  ioS com Emulador: localhost
 *  ioS com dispositivo físico: IP da máquina
 *  Android com Emulador: localhost (adb reverse)
 *  Android com Emulador: 10.0.2.2 (Android Studio) 
 *  Android com dispositivo físico: IP da maquina
 */