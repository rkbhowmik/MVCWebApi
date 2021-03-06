USE [RestaurantDB]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 10/20/2018 1:30:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 10/20/2018 1:30:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[ProductName] [nvarchar](150) NOT NULL,
	[ProductPrice] [money] NOT NULL,
	[ProductDescription] [nvarchar](250) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 10/20/2018 1:30:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Day] [varchar](50) NOT NULL,
	[OpeningTime] [time](7) NOT NULL,
	[ClosingTime] [time](7) NOT NULL,
 CONSTRAINT [PK_Time] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (1, N'Water')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (2, N'Drinks')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (3, N'Burgers')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (4, N'Sandwich')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (5, N'Rolls')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (6, N'Chicken Massala')
GO
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 
GO
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [ProductPrice], [ProductDescription]) VALUES (1, 2, N'Coco Cola', 5.0000, N'250 ml')
GO
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [ProductPrice], [ProductDescription]) VALUES (2, 3, N'Beef Burger', 12.0000, N'With extra chase ')
GO
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [ProductPrice], [ProductDescription]) VALUES (5, 4, N'Chicken Sandwich ', 10.0000, N'With extra cheese ')
GO
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Schedule] ON 
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (1, N'Sunday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (2, N'Monday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (3, N'Tuesday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (4, N'Wednessday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (5, N'Thurshday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (6, N'Friday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
INSERT [dbo].[Schedule] ([Id], [Day], [OpeningTime], [ClosingTime]) VALUES (7, N'Saturday', CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time))
GO
SET IDENTITY_INSERT [dbo].[Schedule] OFF
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
/****** Object:  StoredProcedure [dbo].[GetProductList]    Script Date: 10/20/2018 1:30:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetProductList] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT        Product.ProductId, Product.CategoryId, Category.CategoryName, Product.ProductName, Product.ProductPrice, Product.ProductDescription
    FROM            Category INNER JOIN
                         Product ON Category.CategoryId = Product.CategoryId
END
GO
USE [master]
GO
ALTER DATABASE [RestaurantDB] SET  READ_WRITE 
GO
