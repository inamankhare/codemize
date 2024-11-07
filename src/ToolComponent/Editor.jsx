import React, { useEffect, useRef, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import CodeMirror from 'codemirror';
import './Editor.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorInstanceRef = useRef(null);
  const [output, setOutput] = useState('');
  const [isCodeSyncing, setIsCodeSyncing] = useState(false);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(
      document.getElementById('realTimeEditor'),
      {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        scrollbarStyle: 'native',
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
      }
    );
    editorInstanceRef.current = editor;
    editor.setSize(null, '100%');
    editorInstanceRef.current.on('change', (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== 'setValue') {
        setIsCodeSyncing(true);
        socketRef.current.emit('code-change', { roomId, code });
      }
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('code-change', ({ code }) => {
      if (!isCodeSyncing) {
        editorInstanceRef.current.setValue(code);
      }
      setIsCodeSyncing(false);
    });
  }, [socketRef.current, isCodeSyncing]);

  const runCode = async () => {
    if (editorInstanceRef.current) {
      const code = editorInstanceRef.current.getValue();
      try {
        await socketRef.current.emit('code-update', { code, roomId });
        setOutput('Code updated successfully!');
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <textarea id="realTimeEditor"></textarea>
      </div>
      <button className="run-button" onClick={runCode}>
        Run Code
      </button>
      <div className="output-container">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Editor;