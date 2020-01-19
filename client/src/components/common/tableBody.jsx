import React, {Component} from 'react'

class TableBody extends Component {

    formatDate = (dateStr) => {
        const date = new Date(dateStr);
        let day = date.getDate();
        let month = date.getMonth();
        day = day < 10 ? `0${day}` : `${day}`;
        month = month < 10 ? `0${month+1}` : `${month+1}`;

        const dateStrFormatted = `${day}/${month}/${date.getFullYear()}`;
        return dateStrFormatted;
    }
    
    handleClick(activeState){
        const active = !activeState;
        this.setState({active});
    }

    render() { 
        const {series} = this.props;
        series.sort((a, b) =>  {return new Date(b.date) - new Date(a.date)});
        console.log(series);
        return ( 
            <tbody>
            {
            series.map(serie => (
                <tr key={serie._id}>
                    <td>{this.formatDate(serie.date)}</td>  
                    <td>{serie.wine.name}</td>  
                    <td>{serie.qty}</td>  
                    <td>{serie['person'].name}</td>
                    <td>{serie.destinationStr}</td>
                </tr>
            ))
            }
        </tbody>
         );
    }
}
 
export default TableBody;

