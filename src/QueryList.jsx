import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  Box, Link, Paper, Stack, Typography,
} from '@material-ui/core';

export default function QueryList(props) {
  const { query } = props;
  // const parser = new DOMParser();
  console.log('received query props:');
  console.log(query);
  const queryResult = query.map((entry) => (
    <item>
      <Link href={`https://en.wikipedia.org/?curid=${entry.pageid}`}>
        <Paper>
          <Typography variant="h4">
            {/* {parser.parseFromString(entry.title, 'text/html')} */}
            {parse(entry.title)}
          </Typography>
          <Typography variant="p">
            {/* {parser.parseFromString(entry.snippet, 'text/html')} */}
            {parse(entry.snippet)}
          </Typography>
          {/* <div dangerouslySetInnerHTML={{ __html: query.snippet }} /> */}
        </Paper>
      </Link>
    </item>
  ));
  return (
    <Box id="query-list">
      <Typography variant="h3">Result:</Typography>
      <Stack spacing={2}>{queryResult}</Stack>
    </Box>
  );
}

QueryList.propTypes = {
  query: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    pageid: PropTypes.number.isRequired,
    snippet: PropTypes.string,
  }).isRequired,
};
