import prisma from '../../prisma/client.js';

export const getAnnouncements = async (req, res) => {
  const { search, sort, page } = req.query;
  
  const perPage = 10;
  const currentPage = page ? Number(page) : 1;
  const skip = (currentPage - 1) * perPage;

  const where = {};
  if (search && search.trim() !== '') {
    where.title = {
      contains: search
    };
  }

  const orderBy = {
    createdAt: sort === 'oldest' ? 'asc' : 'desc'
  };

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      orderBy,
      skip,
      take: perPage
    }),
    prisma.announcement.count({ where })
  ]);

  const totalPages = Math.ceil(total / perPage) || 1;

  res.json({
    data,
    pagination: {
      total,
      page: currentPage,
      totalPages,
      perPage
    }
  });
};

export const getAnnouncementById = async (req, res) => {
  const id = Number(req.params.id);
  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: { id }
  });
  res.json(announcement);
};

export const createAnnouncement = async (req, res) => {
  const newAnnouncement = await prisma.announcement.create({
    data: req.body
  });
  res.status(201).json(newAnnouncement);
};

export const updateAnnouncement = async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.announcement.update({
    where: { id },
    data: req.body
  });
  res.json(updated);
};

export const deleteAnnouncement = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.announcement.delete({
    where: { id }
  });
  res.status(204).end();
};