import React, { useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  Autocomplete,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { search, addMusicArtist } from "./utils/searchMatches";
import { data } from "./data";

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "score",
    headerName: "Score",
    width: 60,
    editable: true,
  },
  {
    field: "matches",
    headerName: "Matches",
    type: "string",
    width: 200,
    editable: true,
  },
];

function App() {
  const [input, setInput] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const { artists } = data;
  const options = Object.keys(artists);

  const results = useMemo(() => {
    return search(input);
  }, [input]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <TextField
          label="Search Text..."
          variant="outlined"
          size="small"
          sx={{ marginRight: "40px" }}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsModal(true)}
        >
          Add Artist
        </Button>
      </Box>
      <Box
        sx={{
          height: 400,
          width: 550,
          marginTop: "100px",
          textAlign: "center",
        }}
      >
        {results !== undefined && results.length !== 0 ? (
          <DataGrid
            rows={results}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        ) : (
          <Typography component="h5" variant="h5">
            No result!
          </Typography>
        )}
      </Box>
      <Modal open={isModal} onClose={() => setIsModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography component="h4" variant="h4" align="center">
                Add Artist
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Category: </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                options={options}
                size="small"
                onChange={(event, value) => setCategory(value)}
                renderInput={(param) => (
                  <TextField {...param} label="Category" />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>Artist: </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Your artist"
                size="small"
                fullWidth
                onChange={(e) => setArtist(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                onClick={() => {
                  addMusicArtist(category, artist);
                  setIsModal(false);
                }}
                sx={{ width: 150, mt: 2 }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
