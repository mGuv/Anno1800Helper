import React from "react";
import IndustryService from "../../Anno/Industry/IndustryService";

const industryService:IndustryService = IndustryService.Get();

interface Props {

}

interface State {

}

class Industry extends React.PureComponent<Props, State> {
    public constructor(props:Props) {
        super(props);
        this.state = {};
    }

    public render() : JSX.Element {
        return (
            <div>
                {
                    industryService.All().map(industry => {
                        return <div>{industry.name}</div>
                    })
                }
            </div>
        );
    }
}

export default Industry;