import React from "react";
import ReactQuill from "react-quill";

import { formats, modules } from "./configEditor";
import "react-quill/dist/quill.snow.css";

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value || "",
      counter: null
    };
    this.modules = modules({ onCount: this.onCount });
  }

  handleChange = (value, delta, source, editor) => {
    let valuesave = value;
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0)
    {
      valuesave = null
    } 
    this.setState({ text: valuesave })
    this.props.onchangeEditor(this.props.fieldname, valuesave);
  };
  
  componentWillReceiveProps(nextProps){
    this.setState({ text: nextProps.value });
  }

  render() {
    return (
      <div>
        <ReactQuill
          value={this.state.text || ''}
          onChange={this.handleChange}
          formats={formats}
          modules={this.modules}
          theme={this.props.theme}
        />
      </div>
    );
  }
}

export default ContentEditor;