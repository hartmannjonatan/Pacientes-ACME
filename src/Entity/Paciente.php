<?php

namespace App\Entity;

use App\Repository\PacienteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PacienteRepository::class)]
class Paciente
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $Nome = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $DataNascimento = null;

    #[ORM\Column(length: 11)]
    private ?string $CPF = null;

    #[ORM\Column(length: 10)]
    private ?string $Sexo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Endereco = null;

    #[ORM\Column]
    private ?bool $Status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNome(): ?string
    {
        return $this->Nome;
    }

    public function setNome(string $Nome): self
    {
        $this->Nome = $Nome;

        return $this;
    }

    public function getDataNascimento(): ?\DateTimeInterface
    {
        return $this->DataNascimento;
    }

    public function setDataNascimento(\DateTimeInterface $DataNascimento): self
    {
        $this->DataNascimento = $DataNascimento;

        return $this;
    }

    public function getCPF(): ?string
    {
        return $this->CPF;
    }

    public function setCPF(string $CPF): self
    {
        $this->CPF = $CPF;

        return $this;
    }

    public function getSexo(): ?string
    {
        return $this->Sexo;
    }

    public function setSexo(string $Sexo): self
    {
        $this->Sexo = $Sexo;

        return $this;
    }

    public function getEndereco(): ?string
    {
        return $this->Endereco;
    }

    public function setEndereco(?string $Endereco): self
    {
        $this->Endereco = $Endereco;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->Status;
    }

    public function setStatus(bool $Status): self
    {
        $this->Status = $Status;

        return $this;
    }
}
