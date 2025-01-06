import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Поиск заметок..."
      size="small"
      value={value}
      onChange={onChange}
      sx={{ marginLeft: "auto", marginRight: 2 }}
    />
  );
};
