import { useLocation, useNavigate } from "react-router-dom";
import NotePage from "../NotePage";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const PatientDetail = ({}) => {
  const location = useLocation();
  const [patient, setPatient] = useState(location.state);
  const navigate = useNavigate();
  const auth = getAuth();

  /*   const getPatient = async () => {
    auth.currentUser.getIdToken(true).then(async function (idToken) {
      const response = await axios.get(`/api/patients/${patient._id}`, {
        headers: {
          authtoken: idToken,
        },
      });
      setPatient(response.data);
    });
  };

  useEffect(() => {
    getPatient();
  }, []); */

  return (
    <div>
      <NotePage patient={patient} />
    </div>
  );
};

export default PatientDetail;
