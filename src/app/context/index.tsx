

import { useState, createContext } from 'react';
import { appointments } from '../components/data';


const appointmentContext = createContext<any>(undefined);

type AppointmentProvider = {
  children: any;
};

function AppointmentProvider({ children }: AppointmentProvider) {

  // LocaleStorage para ver si el usuario ya se logio
  const [appoinmentList, setAppoinmentList] = useState([...appointments]);



  return (
    <appointmentContext.Provider value={{
      appoinmentList, setAppoinmentList,
    }}>
      {children}
    </appointmentContext.Provider>
  );
}

export { appointmentContext, AppointmentProvider };