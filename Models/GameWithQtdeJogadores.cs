namespace PO_DSI.Models
{
    public class GameWithQtdeJogadores : Game
    {
        // ele herda todas as propriedade do modelo Game

        // Quantidade de Jogadores de um determinado Game
        public int QtdeJogadores { get; set; }
    }
}