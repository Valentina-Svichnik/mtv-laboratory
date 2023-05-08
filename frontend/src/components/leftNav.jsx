import React, {useEffect, useState} from 'react';
import axios from "axios";
import Logo from '../assets/logoMTV.svg'
import { Link } from 'react-router-dom';

function Uppercase(props) {
    if (props.targeted) {
        return <li className='mt-half'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-uppercase text-gray' > {props.obj.name} </Link></li>;
    }
}

function LowerCase(props) {
    if (!props.targeted) {
        return <li className='mt-half'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-gray' > {props.obj.name} </Link></li>;
    }
}


function LeftNav() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/category/`
        }). then(response => {
            setCategories((response.data))
        })
    }, [])

    return(
        <div className='leftNav'>
            <Link to={{ pathname: `/`, fromDashboard: false }} ><img src={Logo} alt="mtv logo"/></Link>
            <ul>
                {categories.map(output => (
                    <LowerCase key={output.id} obj={output} />
                ))}
            </ul>

            <ul className='pt-half'>
                {categories.map(output => (
                    <Uppercase key={output.id} obj={output} />
                ))}
            </ul>

        </div>
    )
}



// function Uppercase(props) {
//     if (props.obj.targeted) {
//         return <li className='mt-half'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-uppercase text-gray' > {props.obj.name} </Link></li>;
//     }
// }
//
// function LowerCase(props) {
//     if (!props.obj.targeted) {
//         return <li className='mt-half'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-gray' > {props.obj.name} </Link></li>;
//     }
// }
//
// class LeftNav extends React.Component{
//     state = { categories: [], }
//
//     componentDidMount() {
//         let data;
//         axios.get('http://localhost:8000/category/')
//             .then(res => {
//                 data = res.data;
//                 this.setState({
//                     categories: data
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//
//
//     render() {
//         return (
//             <div className='leftNav'>
//                 <a href="#"><img src={Logo} alt="mtv logo"/></a>
//
//                 <ul>
//                     {this.state.categories.map((output, id) => (
//                         <LowerCase key={id} obj={output} />
//                     ))}
//                 </ul>
//
//                 <ul className='pt-half'>
//                     {this.state.categories.map((output, id) => (
//                         <Uppercase key={id} obj={output} />
//                     ))}
//                 </ul>
//
//             </div>
//
//         )
//     }
// }

export default LeftNav;