using System;

namespace Common
{
    public class CustomException : Exception
    {
        public CustomException(string message, Exception inner) : base(message, inner)
        {

        }

        public CustomException(string message) : base(message)
        {

        }
    }
}
