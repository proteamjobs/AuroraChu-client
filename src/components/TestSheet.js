import React, { Component } from "react";
import { Button, Radio } from "antd";

class TestSheet extends Component {
  constructor(props) {
    super(props);

    this.options = [];

    this.state = {
      step: 1,
      selectedValue: 1
    };
  }

  onSelectValue = e => {
    this.setState({
      selectedValue: e.target.value
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    const { step, selectedValue } = this.state;
    return (
      <div>
        <h4>시험 보기</h4>
        {step === 1 && (
          <div>
            <div>마케터가 되기 위한 마지막 관문 입니다.</div>
            <div>준비 되셨나요?</div>
            <div>신중하게 답안을 선택하세요.</div>
            <div>합격을 기원합니다.</div>
            <Button
              onClick={() =>
                this.setState({
                  step: 2
                })
              }
            >
              시험 시작
            </Button>
          </div>
        )}
        {step === 2 && (
          <div>
            {}
            <div>
              <div>1. 다음 중 마케터와 관계없는 것은?</div>
              <Radio.Group
                buttonStyle="solid"
                style={radioStyle}
                onChange={this.onSelectValue}
                value={selectedValue}
              >
                <Radio style={radioStyle} value={1}>
                  Option A
                </Radio>
                <Radio style={radioStyle} value={1}>
                  Option B
                </Radio>
              </Radio.Group>
              <Button>제출하기</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TestSheet;
