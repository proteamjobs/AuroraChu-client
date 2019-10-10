import React, { Component } from "react";
import { Result, Input, message } from "antd";
const { Search } = Input;

class Gate extends Component {
  handleInput = e => {
    if (e !== "wakeup!") {
      message.error("This is an error message");
    } else {
      message.success("This is a success message");
      this.props.handleAdminCheck();
    }
  };
  render() {
    return (
      <>
        <Result
          status="403"
          title="사이트를 점검 중입니다. "
          subTitle="현재 사이트 점검중입니다. 관계자는 코드를 입력해주세요."
          extra={
            <Search
              placeholder="관리자 코드를 입력하세요."
              enterButton="승인"
              size="large"
              onSearch={this.handleInput}
              style={{ width: "300px" }}
            />
          }
        />
      </>
    );
  }
}

// const Gate = props => {
//   return (
//     <>
//       <Result
//         status="403"
//         title="사이트를 점검 중입니다. "
//         subTitle="현재 사이트 점검중입니다. 관계자는 코드를 입력해주세요."
//         extra={
//           <Button type="primary" onClick={props.handleAdminCheck}>
//             승인
//           </Button>
//         }
//       />
//     </>
//   );
// };

export default Gate;
