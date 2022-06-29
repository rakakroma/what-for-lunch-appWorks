
export default function WeatherRuleButton({ className, showWhat, onClick }) {

    if (showWhat === 'showRule') {
        return <button style={{ backgroundColor: "#55d975" }} onClick={onClick} className={className}>規則介紹</button>
    }
    return <button onClick={onClick} className={className}>規則介紹</button>


}