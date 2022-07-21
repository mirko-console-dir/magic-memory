import "./SingleCard.css";
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="card_front">
          <img src={card.src} className="front" alt="card front" />
        </div>
        <div className="card_back" onClick={handleClick}>
          <img src="/img/cover.jpg" className="back" alt="card back" />
        </div>
      </div>
    </div>
  );
}
