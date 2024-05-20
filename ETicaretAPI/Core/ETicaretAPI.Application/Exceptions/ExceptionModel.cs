using System.Text.Json;

namespace ETicaretAPI.Application.Exceptions
{
    public class ExceptionModel 
    {
        public int StatusCode { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }

}
