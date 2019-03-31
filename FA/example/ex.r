Survey1 <- read.table(file.choose(),header=TRUE,sep=',')
head(Survey1)

# run a PCA to determine the number of factors
Survey1.pca <- princomp(Survey1)
summary(Survey1.pca)
plot(Survey1.pca)

# number of components is set according to summary
# factanal requires the dataset: Survey1
#                       factors: 3
#                      rotation: varimax (default)
Survey1.fa1 <- factanal(Survey1,factors=3,rotation='varimax')
Survey1.fa1
Survey1.fa5 <- factanal(Survey1,factors=3,rotation='varimax',scores='regression')
head(Survey1.fa5$scores)
