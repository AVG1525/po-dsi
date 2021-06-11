using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PO_DSI.Models;

namespace PO_DSI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly DbPoDsiContext _context;

        public GamesController(DbPoDsiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetGames()
        {
            var games = await _context.Games.ToListAsync();
            return Ok(GetJogadores(games));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(long id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGame), new { id = game.Id}, game);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGame(long id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return game;
        }

        private bool GameExists(long id)
        {
            return _context.Games.Any(e => e.Id == id);
        }

        private List<GameWithQtdeJogadores> GetJogadores(IEnumerable<Game> games)
        {
            List<GameWithQtdeJogadores> newGames = new List<GameWithQtdeJogadores>();
            foreach (var game in games.ToList())
            {
                int qtdeJogadores = _context.Jogadores.Count(e => 
                    e.Jogo.ToLower() == game.Nome.ToLower());
                
                newGames.Add(new GameWithQtdeJogadores {
                    Id = game.Id,
                    Nome = game.Nome,
                    Sinopse = game.Sinopse,
                    Plataforma = game.Plataforma,
                    AnoLancamento = game.AnoLancamento,
                    QtdeJogadores = qtdeJogadores
                });
            }

            return newGames;
        }
    }
}
