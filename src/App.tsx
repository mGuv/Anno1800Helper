import React from 'react';
import Header from './Components/Header/Header';
import "./App.scss";
import IslandList from './Components/IslandList/IslandList';
import Island from './Anno/Island/Island';
import { IslandService, IslandServiceSingleton } from './Services/IslandService';
import IslandBody from './Components/IslandList/Residents/IslandBody';
import IslandHeader from './Components/IslandList/Residents/IslandHeader';

const islandService:IslandService = IslandServiceSingleton;

interface Props {

}

interface State {
  selectedTab: number;
  islands:Island[];
}

class App extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: 0,
      islands: islandService.Islands.getValue(),
    }

    islandService.Islands.registerOnChange(this.updateIsland);
  }

  private updateIsland = (islands:Island[]) => {
    this.setState({
      islands
    });
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
          <IslandList islands={this.state.islands} islandBody={IslandBody} islandHeader={IslandHeader} />
        </div>
      </div>
    );
  }
}

export default App;
