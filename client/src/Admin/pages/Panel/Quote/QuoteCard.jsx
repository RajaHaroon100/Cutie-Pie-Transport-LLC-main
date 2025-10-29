import moment from "moment";

export default function QuoteCard({ onClick, firstName, lastName, loadingDate, type }) {
    return(
        <div onClick={onClick} className="max-w-sm rounded overflow-hidden shadow-sm p-4 border-b font-sans text-gray-900 border-gray-400 bg-gray-100 hover:bg-gray-300">
            <div className="font-bold text-xl mb-1">{firstName} {lastName}</div>
            <p className="text-gray-700 text-sm">
                Loading Date: 
                <span className="font-semibold text-base"> {moment(loadingDate).format('DD-MM-YYYY')}</span>
            </p>
            <p className="text-gray-700 text-sm">
                Type: 
                <span className="font-semibold text-base"> {type}</span>
            </p>
        </div>
    );
}
