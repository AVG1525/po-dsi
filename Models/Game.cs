namespace PO_DSI.Models
{
    public class Game
    {
        // Id do Game
        public long Id { get; set; }
        // Nome do Game
        public string Nome { get; set; }
        // Sinopse do Game
        public string Sinopse { get; set; }
        // Plataforma em que o jogo se localiza
        public string Plataforma { get; set; }
        // Ano do Lancamento do jogo
        public int AnoLancamento { get; set; }
    }
}