import "./App.css";

export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
            <p><b>🗸 {label}</b> - {quantity.toFixed(2)} {unit}</p>
        </div>
    )
}