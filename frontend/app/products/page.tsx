"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import { useProductsHook } from "../hooks/useProducts";
import { ENV } from "@/lib/envs";

const ProductsPage = () => {
  const {
    isLoading,
    products,
    selectedProduct,
    handleDeleteProduct,
    handleCloseModal,
    isModalOpen,
    handleDeleteButton,
  } = useProductsHook();

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Products
      </Typography>
      <Link href="/products/create" passHref>
        <Button variant="contained" sx={{ marginBottom: "1rem" }}>
          Criar Produto
        </Button>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" ></TableCell>
            <TableCell align="center" >ID</TableCell>
            <TableCell align="center" >Descrição</TableCell>
            <TableCell align="center" >Preço</TableCell>
            <TableCell align="center" >Estoque</TableCell>
            <TableCell align="center" >Data de criação</TableCell>
            <TableCell align="center" >Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell align="center" >
                <Avatar
                  src={`${ENV.NEXT_PUBLIC_API_URL}/${product.images[0]}` || "/default-image.png"}
                  alt={product.description}
                  sx={{ width: 50, height: 50 }}
                />
              </TableCell>
              <TableCell align="center" >{product.id}</TableCell>
              <TableCell align="center" >{product.description}</TableCell>
              <TableCell align="center" >{product.price}</TableCell>
              <TableCell align="center" >{product.stock}</TableCell>
              <TableCell align="center" >
                {dayjs(product.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center" >
                <Link href={`/products/${product.id}`} passHref>
                  <Button variant="outlined" sx={{ marginY: "0.5rem" ,marginX: "0.5rem" }}>
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteButton(product)}
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você quer deletar o produto{selectedProduct?.description ? " " + selectedProduct.description : '' }?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button
              color="error"
              onClick={handleDeleteProduct}
              autoFocus
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Deletar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
