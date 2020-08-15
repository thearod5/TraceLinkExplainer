import React from "react";
import { Word, Words } from "../../../../shared/types/Trace";

interface ArtifactWordsProps {
  words: Words;
}

export default function ArtifactWords(props: ArtifactWordsProps) {
  const body = createWords(props.words);
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padLight overflowScroll">{body}</div>
    </div>
  );
}

function createWords(words: Words) {
  return words.map((word: Word, wordIndex: Number) => {
    const wordId = `${word.word}:${wordIndex}`;
    if (word.word === "\n") {
      return <br key={wordId}></br>;
    }
    return (
      <pre
        key={wordId}
        style={{
          fontSize: `${word.size}em`,
          color: word.color,
          display: "inline-block",
          wordWrap: "initial",
        }}
      >
        {word.word}
      </pre>
    );
  });
}
