import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntriesNoSsn());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patients = patientService.getEntries();
  const patientById = patients.find(patient => patient.id === id);
  res.json(patientById);
});



router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;