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
  CardActions
} from "@mui/material";
import Handlebars from "handlebars";
import { useEffect, useMemo, useState } from "react";
import {
  createStateContext,
  useLocalStorage,
  useDebounce,
  useCopyToClipboard,
  useTitle
} from "react-use";

const [useText, TextProvider] = createStateContext("");
const [useData, DataProvider] = createStateContext(
  {} as Record<string, string>
);

const defaultText = `
{{hello}}
`;

const CopyButtonSnackbar = ({ buttonText = "Copy", text = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={() => {
          copyToClipboard(text);
          setLoading(true);
        }}
      >
        {buttonText}
      </Button>
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
  const [text, setText] = useState<string>(data[variable]);

  useDebounce(
    () => {
      setData((i) => ({ ...i, [variable]: text }));
    },
    500,
    [text]
  );

  return (
    <TextField
      size="small"
      variant="standard"
      label={variable}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};

const Variables = () => {
  const [data] = useData();

  const list = useMemo(() => {
    return Object.keys(data);
  }, [data]);

  return (
    <Card variant="outlined">
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
  const [textRaw, setTextRaw] = useLocalStorage(
    "simple-te:textraw",
    defaultText
  );
  const [, setList] = useData();
  const [text, setText] = useText();

  useDebounce(
    () => {
      if (textRaw) setText(textRaw);
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
    } catch (e) {}
  }, [text, setList]);

  return (
    <Card variant="outlined">
      <CardActions>
        <CopyButtonSnackbar text={text} />
      </CardActions>
      <CardContent>
        <TextField
          label="Text Message"
          multiline
          value={textRaw}
          fullWidth
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
