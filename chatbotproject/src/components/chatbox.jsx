import React , {Component} from "react";
import PropTypes  from 'prop-types'
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios';



class Openai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            result: '',
            trigger: false,
        };

        this.triggerNext = this.triggerNext.bind(this);
    }

    componentWillMount() {
        const self = this;
        const {steps} = this.props;
        const chats = steps.chat.value;
        const fetchData = async() => {
            
            await axios.post("http://localhost:3000",{chats}).then((res)=>{
                const data = res.data;
                if(data){
                    self.setState({
                        loading: false,
                        result: data
                    });
                }else{
                    self.setState({
                        loading:false, 
                        result: 'Not found'
                    });
                }
                }).catch((err)=>{
                console.log(err);
            })
        }

        fetchData();
    }
    triggerNext(){
        this.setState({trigger: true}, ()=>{
            this.props.triggerNextStep();
        });
    }


    render() {
        const {trigger, loading, result} = this.state;

        return(
            <div>
                {loading ? <Loading /> : result}
                {
                    !loading && (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                            }}
                        ></div>

                    )
                }
                {
                    !trigger &&  this.setState({trigger: true},()=>{
                        this.props.triggerNextStep();
                    })
                }
            </div>
        );
    }
        
}

Openai.propTypes = {
    steps: PropTypes.object,
    triggerNextStep : PropTypes.func,
};

Openai.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

const Chatbot = () => {
    return(
        <div>
            <ChatBot steps={
                [
                    {
                        id: '1',
                        message: 'Ask me Amything',
                        trigger: 'chat'
                    },
                    {
                        id: 'chat',
                        user: true,
                        trigger: '2',
                    },
                    {
                        id:'2',
                        component: <Openai />,
                        asMessage:true,
                        waitAction: true,
                        trigger: 'chat',
                    }
                ]
            } />
        </div>
    )
}

export default Chatbot;

