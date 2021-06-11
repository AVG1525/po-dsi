using Microsoft.EntityFrameworkCore;

namespace PO_DSI.Models
{
    public class DbPoDsiContext : DbContext
    {
        public DbPoDsiContext(DbContextOptions<DbPoDsiContext> options)
            : base(options)
        {
        }
        public DbSet<Game> Games {get; set;}
        public DbSet<Jogador> Jogadores {get; set;}
    }
}