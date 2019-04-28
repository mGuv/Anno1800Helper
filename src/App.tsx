import React from 'react';
import Header from './Components/Header';
import Demand from './Components/Demand/Demand';
import "./App.css";

// const theme: MuiTheme = getMuiTheme({
//   palette: {
//     primary1Color: '#19181e',
//     borderColor: '#42413c',
//     canvasColor: '#fce3ba',

//   },
//   appBar: {
//     textColor: '#fcf0b4'
//   }

// });

interface Props {

}

interface State {
  selectedTab: number
}

class App extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: 0
    }
  }

  private handleTabChange = (newTab: number) => {
    this.setState({
      selectedTab: newTab
    });
  };

  public render(): JSX.Element {
    return (
      <div className="annoHelper__main">
        <Header selectedTab={this.state.selectedTab} onTabSelected={this.handleTabChange} />
        <div className="annoHelper__contentContainer">
          <Demand />
        </div>
      </div>
    );
  }
}

export default App;
