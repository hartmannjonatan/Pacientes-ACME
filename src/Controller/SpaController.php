<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

//esse controller é responsável por renderizar qualquer rota
class SpaController extends AbstractController
{
    //recebe como parâmetro qualquer palavra exceto '/api/' (rota da api)
    #[Route('/{reactRouting}', name: 'app_index', requirements: ["reactRouting"=>"^(?!api).+"], defaults: ["reactRouting" => null])]
    public function index(): Response
    {
        return $this->render('spa/index.html.twig'); //renderiza o arquivo padrão index.html.twig
    }
}
