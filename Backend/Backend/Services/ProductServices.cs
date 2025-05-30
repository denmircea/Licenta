using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public static class ImageUtils
    {
        public static string ResizeImage(string base64Image, int width, int height)
        {
            if (string.IsNullOrEmpty(base64Image))
                throw new ArgumentException("Image data is null or empty.", nameof(base64Image));

            byte[] imageBytes = Convert.FromBase64String(base64Image);
            using var inputStream = new MemoryStream(imageBytes);
            using var originalImage = System.Drawing.Image.FromStream(inputStream);

            // Calculate new size while keeping aspect ratio
            double ratioX = (double)width / originalImage.Width;
            double ratioY = (double)height / originalImage.Height;
            double ratio = Math.Min(ratioX, ratioY);

            int newWidth = (int)(originalImage.Width * ratio);
            int newHeight = (int)(originalImage.Height * ratio);

            using var resizedBitmap = new System.Drawing.Bitmap(newWidth, newHeight);
            using (var graphics = System.Drawing.Graphics.FromImage(resizedBitmap))
            {
                graphics.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                graphics.DrawImage(originalImage, 0, 0, newWidth, newHeight);
            }

            using var outputStream = new MemoryStream();
            resizedBitmap.Save(outputStream, System.Drawing.Imaging.ImageFormat.Png);
            return Convert.ToBase64String(outputStream.ToArray());
        }
    }
    public class ProductServices : BaseServices, IProductServices
    {
        public ProductServices(ApplicationDbContext context) : base(context)
        {
        }

        public List<Product> GetProductsByCategoryID(Guid categoryId)
        {
            return Context.Products
                .Where(p => p.CategoryID == categoryId)
                .OrderBy(p => p.Name)
                .ToList();
        }

        public Product GetProductByID(Guid id)
        {
            var result = Context.Products
                .Where(p => p.ID == id)
                .FirstOrDefault();
            if (result == null)
            {
                throw new Exception("Product not found");
            }
            return result;
        }
        public List<Product> GetAllProducts()
        {
            var result = Context.Products.AsNoTracking().ToList();
            return result;
        }

        public Guid SaveProduct(Product product)
        {
            if (product.Image?.Length > 0)
            {
                // resize this base64 image to 100x100
                var base64Image = product.Image;
                if (base64Image.Length > 0)
                {
                    base64Image = ImageUtils.ResizeImage(base64Image, 100, 100);
                    if (base64Image != null && base64Image?.Length > 0)
                    {
                        product.Image = base64Image;
                    }
                }

            }
            if (product.ID == Guid.Empty)
            {
                product.ID = new Guid();
                Context.Products.Add(product);
            }
            else
            {
                Context.Products.Update(product);
            }
            try
            {
                Context.SaveChanges();
                return product.ID;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return Guid.Empty;
            }
        }
    }
}
