import { useForm, useWatch } from "react-hook-form";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type FinanceFormValues = {
  initialBalance: number;
  feeRate: number;
  grossYield: number;
};

export const FinanceForm: React.FC = () => {
  const { register, control, setValue } = useForm<FinanceFormValues>({
    defaultValues: {
      initialBalance: 10000000,
      feeRate: 25.0,
      grossYield: 2.50,
    },
  });

  const { initialBalance, feeRate, grossYield } = useWatch({ control });
  const [initialBalanceDisplay, setInitialBalanceDisplay] = useState<string>(
    (initialBalance ?? 0).toLocaleString()
  );

  // %入力対応
  const feeRatePercent = (feeRate ?? 0) / 100;
  const grossYieldPercent = (grossYield ?? 0) / 100;
  const netYieldPercent = grossYieldPercent < 0 ? grossYieldPercent : grossYieldPercent * (1 - feeRatePercent);
  const finalBalance = (initialBalance ?? 0) * (1 + netYieldPercent);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: 0  }}>
      <Box component="form" sx={{ p: 4, borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400, width: '100%' }}>
      {/* 入力項目 */}
      <TextField
        label="月初残高"
        type="text"
        variant="outlined"
        sx={{ backgroundColor: "#FFF9E5" }}
        value={initialBalanceDisplay}
        onChange={e => {
          const raw = e.target.value.replace(/,/g, "");
          setInitialBalanceDisplay(raw);
          const num = Number(raw);
          if (!isNaN(num)) setValue("initialBalance", num);
        }}
        onBlur={() => {
          const num = Number(initialBalanceDisplay.replace(/,/g, ""));
          if (!isNaN(num)) setInitialBalanceDisplay(num.toLocaleString());
        }}
        onFocus={() => {
          setInitialBalanceDisplay(initialBalanceDisplay.replace(/,/g, ""));
        }}
        InputProps={{ inputProps: { step: 1 } }}
      />
      <TextField
        label="手数料%"
        type="number"
        variant="outlined"
        color="primary"
        sx={{ backgroundColor: "#FFF9E5" }}
        {...register("feeRate")}
        InputProps={{ inputProps: { step: 0.1 } }}
      />
      <TextField
        label="収益率%（手数料前）"
        type="number"
        variant="outlined"
        color="primary"
        sx={{ backgroundColor: "#FFF9E5" }}
        {...register("grossYield")}
        InputProps={{ inputProps: { step: 0.1 } }}
      />
      {/* 計算項目 */}
      <TextField
        label="収益率%（手数料後）"
        type="number"
        variant="outlined"
        color="primary"
        sx={{ backgroundColor: "#E6F2FF" }}
        value={(netYieldPercent * 100).toFixed(2)}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="月末残高"
        type="text"
        variant="outlined"
        color="primary"
        sx={{ backgroundColor: "#E6F2FF" }}
        value={Math.round(finalBalance).toLocaleString()}
        InputProps={{ readOnly: true }}
      />
      </Box>
    </Box>
  );
};