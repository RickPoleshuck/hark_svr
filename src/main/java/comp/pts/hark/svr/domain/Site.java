package comp.pts.hark.svr.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import comp.pts.hark.svr.domain.enumeration.SiteStatus;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Site.
 */
@Entity
@Table(name = "site")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Site implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SiteStatus status;

    @Column(name = "last_check")
    private Instant lastCheck;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sites" }, allowSetters = true)
    private ApplicationUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Site id(Long id) {
        this.id = id;
        return this;
    }

    public SiteStatus getStatus() {
        return this.status;
    }

    public Site status(SiteStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SiteStatus status) {
        this.status = status;
    }

    public Instant getLastCheck() {
        return this.lastCheck;
    }

    public Site lastCheck(Instant lastCheck) {
        this.lastCheck = lastCheck;
        return this;
    }

    public void setLastCheck(Instant lastCheck) {
        this.lastCheck = lastCheck;
    }

    public String getUrl() {
        return this.url;
    }

    public Site url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ApplicationUser getUser() {
        return this.user;
    }

    public Site user(ApplicationUser applicationUser) {
        this.setUser(applicationUser);
        return this;
    }

    public void setUser(ApplicationUser applicationUser) {
        this.user = applicationUser;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Site)) {
            return false;
        }
        return id != null && id.equals(((Site) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Site{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", lastCheck='" + getLastCheck() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
