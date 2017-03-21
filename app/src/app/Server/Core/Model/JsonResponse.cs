using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app.Server.Core.Model
{
    public class JsonResponse
    {
        public bool Successful { get; set; }
        public string Error { get; set; }
        public object Data { get; set; }
    }
}
