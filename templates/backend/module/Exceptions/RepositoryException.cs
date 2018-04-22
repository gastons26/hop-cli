using System;
using System.Runtime.Serialization;

namespace --ProjectName--.--ModuleName--.Exceptions
{
    [Serializable]
    public class RepositoryException : Exception
    {
        public RepositoryException(string message) : base(message) { }
        public RepositoryException(string message, Exception innerException) : base(message, innerException) { }
        protected RepositoryException(SerializationInfo info, StreamingContext context) : base(info, context) { }
    }
}