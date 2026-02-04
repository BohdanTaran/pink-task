import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";

const PatientList: React.FC = () => {
  const { patients, loading, page, handlePageChange, loadInitial } =
    usePagination();
  const navigate = useNavigate();

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const formatName = (name: any[]) => {
    if (!name || name.length === 0) return "Unknown Patient";
    return `${name[0].given?.join(" ") || ""} ${name[0].family || ""}`;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
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
        ) : (
          <List disablePadding>
            {patients.map((p) => (
              <React.Fragment key={p.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/patient/${p.id}`)}
                    sx={{ py: 2 }}
                  >
                    <ListItemText
                      primary={formatName(p.name)}
                      secondary={`Patient ID: ${p.id}`}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
        }}
      >
        <Pagination
          count={page + 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="small"
        />
      </Box>
    </Paper>
  );
};

export default PatientList;
