namespace PO_DSI.Models
{
    public class Jogador
    {
        // Id do Jogador
        public long Id { get; set; }
        // Nome do Jogador
        public string Nome { get; set; }
        // Nome de Usuário do Jogador uzado no Game
        public string Usuario { get; set; }
        // Nome do Game
        public string Jogo { get; set; }
        // Idade do Jogador
        public int Idade { get; set; }
    }
}