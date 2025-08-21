import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FinanceForm } from "./components/FinanceForm";

function App() {
  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 4 }}>
        ForexPOOL月末残高計算
      </Typography>
      <FinanceForm />
    </Container>
  );
}

export default App;