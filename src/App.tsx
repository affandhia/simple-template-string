import {
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  IconButton
} from "@mui/material";
import Handlebars from "handlebars";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createStateContext,
  useLocalStorage,
  useDebounce,
  useCopyToClipboard,
  useTitle
} from "react-use";
import CancelIcon from "@mui/icons-material/Cancel";
import { grey } from "@mui/material/colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
const [useText, TextProvider] = createStateContext("");
const [useData, DataProvider] = createStateContext(
  {} as Record<string, string>
);

const defaultText = `
{{hello}}
`;

const CopyButtonSnackbar = ({ text = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <IconButton
        disabled={isLoading}
        onClick={() => {
          copyToClipboard(text);
          setLoading(true);
        }}
        aria-label="copy"
        size="small"
      >
        <ContentCopyIcon fontSize="small" sx={{ color: "primary.main" }} />
      </IconButton>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={isLoading}
        autoHideDuration={2000}
        onClose={() => setLoading(false)}
      >
        <Alert onClose={() => setLoading(false)} severity="success">
          Text Copied
        </Alert>
      </Snackbar>
    </>
  );
};

const InputVariable = ({ variable }: { variable: string }) => {
  const [data, setData] = useData();
  const defaultValue = data[variable];
  const [text, setText] = useState<string>(defaultValue);

  useDebounce(
    () => {
      setData((i) => ({ ...i, [variable]: text }));
    },
    500,
    [text]
  );

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  return (
    <TextField
      size="small"
      variant="filled"
      label={variable}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setText("")}
              aria-label="clear"
              size="small"
            >
              <CancelIcon fontSize="small" sx={{ color: grey[400] }} />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

const Variables = () => {
  const [data, setData] = useData();

  const list = useMemo(() => {
    return Object.keys(data);
  }, [data]);

  if (!list.length) return null;

  return (
    <Card variant="outlined">
      <CardActions>
        <Stack direction="row" justifyContent="flex-end" width="100%" mr={1}>
          <Button
            onClick={() => {
              setData(list.reduce((prev, cur) => ({ ...prev, [cur]: "" }), {}));
            }}
            aria-label="copy"
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
          >
            {"Clear"}
          </Button>
        </Stack>
      </CardActions>
      <CardContent>
        <Stack spacing={1}>
          {list.map((i) => (
            <InputVariable key={i} variable={i} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const TextDataInput = () => {
  const textRef = useRef<HTMLInputElement>(null);
  const isInputtingVariable = useRef<boolean>(false);
  const [textRaw, setTextRaw] = useLocalStorage(
    "simple-te:textraw",
    defaultText
  );
  const [, setList] = useData();
  const [text, setText] = useText();
  const selectionPos = useRef({
    start: 0,
    end: 0
  });
  const [error, setError] = useState("");

  useDebounce(
    () => {
      setText(textRaw || "");
    },
    500,
    [textRaw]
  );

  useEffect(() => {
    const data = {} as Record<string, string>;
    try {
      Handlebars.parseWithoutProcessing(text)
        .body.filter(({ type }) => type === "MustacheStatement")
        .forEach((statement) => {
          const variable =
            // @ts-ignore
            statement.params[0]?.original || statement.path?.original;
          data[variable] = "";
        });
      setList((i) => {
        const newObj = {} as Record<string, string>;
        for (let j in data) {
          newObj[j] = i[j];
        }

        return newObj;
      });
      setError("");
    } catch (e) {
      setError("There is invalid variable");
    }
  }, [text, setList]);

  const handleUpdatePosition = (e: any) => {
    const { selectionStart: start, selectionEnd: end } = e.target;
    selectionPos.current = { start: start || 0, end: end || 0 };
  };

  return (
    <Card variant="outlined">
      <CardActions>
        <CopyButtonSnackbar text={text} />
        <Button
          onClick={() => {
            const i = textRaw;
            if (i !== undefined) {
              setTextRaw(
                `${i.substring(0, selectionPos.current.start)}{{}}${i.substring(
                  selectionPos.current.end,
                  i.length
                )}`
              );
            }

            isInputtingVariable.current = true;
            textRef.current?.focus();
          }}
        >
          Insert Variable
        </Button>
      </CardActions>
      <CardContent>
        <TextField
          inputRef={textRef}
          error={!!error}
          helperText={error}
          label="Text Message"
          multiline
          value={textRaw}
          fullWidth
          onFocus={(e) => {
            if (isInputtingVariable.current) {
              setTimeout(() => {
                e.target.selectionStart = selectionPos.current.start + 2;
                e.target.selectionEnd = selectionPos.current.start + 2;
                isInputtingVariable.current = false;
              }, 60 /* give delay waiting for rerender */);
            }
          }}
          onBlur={handleUpdatePosition}
          onKeyDown={handleUpdatePosition}
          onChange={(e) => {
            setTextRaw(e.target.value);
          }}
        />
      </CardContent>
    </Card>
  );
};

const Renders = () => {
  const [data] = useData();
  const [text] = useText();

  const compiledText = useMemo(() => {
    let strings = "";

    try {
      strings = Handlebars.compile(text)(
        Object.keys(data).reduce((prev, i) => {
          return {
            ...prev,
            [i]: data[i] ? data[i] : `{{${i}}}`
          };
        }, {})
      );
    } catch (e) {}
    return strings || text;
  }, [text, data]);

  return (
    <Stack>
      <Stack direction="row" alignItems="center"></Stack>
      <Card variant="outlined">
        <CardActions>
          <CopyButtonSnackbar text={compiledText} />
        </CardActions>
        <CardContent>
          <Typography component="pre" variant="body1" gutterBottom>
            {compiledText}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default function App() {
  useTitle("Template String");
  return (
    <TextProvider>
      <DataProvider>
        <Stack
          spacing={1}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Grid container sx={{ gap: 1 }}>
            <Grid xs={12} md>
              <TextDataInput />
            </Grid>
            <Grid xs={12} md>
              <Renders />
            </Grid>
          </Grid>
          <Variables />
        </Stack>
      </DataProvider>
    </TextProvider>
  );
}
