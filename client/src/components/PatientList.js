import Patient from "./Patient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const PatientList = ({
  patients,
  setPatients,
  selectPatient,
  deletePatient,
}) => {
  const auth = getAuth();
  const { user } = UserAuth();

  const getPatients = async () => {
    auth.currentUser.getIdToken(true).then(async function (idToken) {
      const response = await axios.get("/api/patients", {
        headers: {
          authtoken: idToken,
        },
      });
      setPatients(response.data);
    });
  };

  useEffect(() => {
    if (user) {
      getPatients();
    } else {
      setPatients("");
    }
  }, [user]);

  /* const patientsSorted = patients || []; */
  patients.sort((a, b) => a.lastName.localeCompare(b.lastName));
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between mb-2">
          <h3 className="text-2xl border-b-2">Patients</h3>
          <button onClick={() => navigate("/add-patient")}>
            Add new patient
          </button>
        </div>
        {patients.map((patient) => (
          <Patient
            key={patient._id}
            patient={patient}
            deletePatient={deletePatient}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
