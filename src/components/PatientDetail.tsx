import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import fhirclient from "fhirclient";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

const client = fhirclient.client("https://r4.smarthealthit.org");

const PatientDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await client.request(`Patient/${id}`);
        setPatient(data);
      } catch (err: any) {
        showNotification(`Failed to load patient: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id, showNotification]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 4, height: "100%", overflowY: "auto" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to List
      </Button>

      {patient ? (
        <Box>
          <Typography variant="h4" color="primary" gutterBottom>
            {patient.name?.[0].given?.join(" ")} {patient.name?.[0].family}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  GENDER
                </Typography>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {patient.gender || "Not specified"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  BIRTH DATE
                </Typography>
                <Typography variant="h6">
                  {patient.birthDate || "Not specified"}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">
                ADDRESS
              </Typography>
              {patient.address?.length > 0 ? (
                patient.address.map((addr: any, idx: number) => (
                  <Typography
                    key={idx}
                    variant="body1"
                    sx={{ mt: 1, fontWeight: "medium" }}
                  >
                    {addr.line?.join(", ")}
                    <br />
                    {addr.city}, {addr.state} {addr.postalCode}
                  </Typography>
                ))
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  No address details available.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No patient data found.
        </Typography>
      )}
    </Paper>
  );
};

export default PatientDetail;
