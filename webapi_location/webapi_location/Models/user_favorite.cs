//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace webapi_location.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class user_favorite
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int location_id { get; set; }
    
        public virtual master_location master_location { get; set; }
        public virtual user_information user_information { get; set; }
    }
}